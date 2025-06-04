// URL публичного API LibreTranslate
const API_URL = "https://libretranslate.de/translate";

// Получаем элементы из DOM
const inputText = document.getElementById("inputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const outputText = document.getElementById("outputText");

// Функция перевода
async function translateText() {
  const text = inputText.value.trim();
  const source = sourceLang.value;
  const target = targetLang.value;

  if (!text) {
    outputText.textContent = "Введите текст для перевода.";
    return;
  }

  translateBtn.disabled = true;
  translateBtn.textContent = "Переводим...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: source,
        target: target,
        format: "text"
      })
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    const data = await response.json();
    outputText.textContent = data.translatedText;
  } catch (err) {
    console.error(err);
    outputText.textContent = "Не удалось выполнить перевод.";
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Перевести";
  }
}

// Обработчик клика по кнопке
translateBtn.addEventListener("click", translateText);

// Пример интеграции с Telegram Web App SDK (если нужно передавать данные из Telegram)
window.addEventListener("DOMContentLoaded", () => {
  if (window.TelegramWebApp) {
    // Например, можно скрыть кнопку "Закрыть" и поменять цвет 
    Telegram.WebApp.expand();
    Telegram.WebApp.MainButton.text = "Закрыть";
    Telegram.WebApp.MainButton.onClick(() => {
      Telegram.WebApp.close();
    });
  }
});
