import React, { useEffect, useState } from "react";
import "../component/index.css";

const Logo = () => {
  const texts = [
    { part1: "Code ", part2: "life" },
    { part1: "life ", part2: "Code" },
  ]; // Массив текстов для отображения

  const [displayedText, setDisplayedText] = useState({ part1: "", part2: "" });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [writingIndex, setWritingIndex] = useState(0); // Индекс для написания текста
  const [isWriting, setIsWriting] = useState(true); // Состояние для отслеживания, пишем ли мы текст
  const [isUnderlined, setIsUnderlined] = useState(false); // Состояние для подчеркивания текста
  const [isGlowing, setIsGlowing] = useState(false); // Состояние для свечения текста

  useEffect(() => {
    const fullText = texts[currentTextIndex]; // Текущий текст для отображения

    const interval = setInterval(
      () => {
        if (isWriting) {
          if (writingIndex < fullText.part1.length + fullText.part2.length) {
            if (writingIndex < fullText.part1.length) {
              setDisplayedText((prev) => ({
                ...prev,
                part1: fullText.part1.slice(0, writingIndex + 1),
                part2: prev.part2,
              })); // Обновление отображаемого текста для первой части
            } else {
              const part2Index = writingIndex - fullText.part1.length;
              setDisplayedText({
                part1: fullText.part1,
                part2: fullText.part2.slice(0, part2Index + 1),
              }); // Обновление отображаемого текста для второй части
            }
            setWritingIndex((prev) => prev + 1); // Увеличиваем индекс написания
          } else {
            // Начинаем свечение и мигание текста

            if (displayedText.part1 !== 'life ') {
              setIsGlowing(true); // Начинаем свечение
            }

            // Задержка для мигания текста
            const blinkDuration = 450; // Время мигания в миллисекундах
            const blinkCount = 2; // Количество миганий

            console.log(displayedText)

            if (displayedText.part1 !== 'life ') {
              for (let i = 0; i < blinkCount; i++) {
                setTimeout(() => {
                  setIsGlowing((prev) => !prev); // Переключаем свечение
                }, i * blinkDuration); // Задержка для мигания
              }
            }

            // После завершения мигания, начинаем стирать текст
            setTimeout(() => {
              setIsGlowing(false); // Отключаем свечение
              setIsUnderlined(true); // Подчеркиваем текст после завершения написания
              setIsWriting(false); // Начинаем стирать текст
            }, blinkCount * blinkDuration); // Задержка перед началом стирания
          }
        } else {
          if (writingIndex > 0) {
            if (writingIndex > fullText.part1.length) {
              const part2Index = writingIndex - fullText.part1.length;
              setDisplayedText((prev) => ({
                part1: prev.part1,
                part2: fullText.part2.slice(0, part2Index - 1),
              })); // Стираем текст для второй части
            } else {
              setDisplayedText((prev) => ({
                part1: prev.part1.slice(0, writingIndex - 1),
                part2: prev.part2,
              })); // Стираем текст для первой части
            }
            setWritingIndex((prev) => prev - 1); // Уменьшаем индекс написания
          } else {
            // Переход к следующему тексту
            setIsUnderlined(false); // Убираем подчеркивание
            setCurrentTextIndex((prev) => (prev + 1) % texts.length); // Переход к следующему тексту
            setIsWriting(true); // Начинаем писать новый текст
            setWritingIndex(0); // Сбрасываем индекс для нового текста
          }
        }
      },
      isWriting ? 400 : 200
    ); // Задержка в 400 м с при написании и 200 мс при стирании

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [isWriting, currentTextIndex, writingIndex]); // Зависимости для эффекта

  return (
    <div className="containerLogo">
      <div
        style={{
          backgroundColor: isUnderlined ? "underline" : "none ",
          backgroundColor: isUnderlined ? "#492525" : "#121214",
        }}
        className="block"
      >
        <h1>
          {isGlowing ? (
            <span className={`roboto-thin glow`}>{displayedText.part1}</span>
          ) : (
            <span className="roboto-thin">{displayedText.part1}</span>
          )}
          <span>{displayedText.part2}</span>
          {<span className="cursor">|</span>} {/* Курсор */}
        </h1>
      </div>
    </div>
  );
};

export default Logo;
