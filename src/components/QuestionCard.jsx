
import { useEffect, useState } from "react";

function QuestionCard({ question, selectedAnswer, onSelect }) {
  const [otherText, setOtherText] = useState("");

  useEffect(() => {
    if (
      selectedAnswer &&
      !Array.isArray(selectedAnswer) &&
      typeof selectedAnswer === "object" &&
      "otherText" in selectedAnswer
    ) {
      setOtherText(selectedAnswer.otherText || "");
    } else if (Array.isArray(selectedAnswer)) {
      const otherOption = selectedAnswer.find(
        (item) =>
          item &&
          typeof item === "object" &&
          item.value === "Other"
      );
      setOtherText(otherOption?.otherText || "");
    } else {
      setOtherText("");
    }
  }, [question?.id, selectedAnswer]);

  if (!question) return null;

  const options = question.options || [];
  const isMultiple = question.type === "multiple";
  const isText = question.type === "text";

  const selectedValue =
    selectedAnswer &&
    !Array.isArray(selectedAnswer) &&
    typeof selectedAnswer === "object"
      ? selectedAnswer.value
      : selectedAnswer;

  function toggleOption(value) {
    const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];

    const isSelected = current.some((item) =>
      typeof item === "object" ? item.value === value : item === value
    );

    let next;

    if (isSelected) {
      next = current.filter((item) =>
        typeof item === "object" ? item.value !== value : item !== value
      );
    } else if (question.allowOther && value === "Other") {
      next = [...current, { value: "Other", otherText }];
    } else {
      next = [...current, value];
    }

    onSelect(next);
  }

  function selectOption(value) {
    if (question.allowOther && value === "Other") {
      onSelect({ value: "Other", otherText });
    } else {
      onSelect(value);
    }
  }

  function updateOtherText(value) {
    setOtherText(value);

    if (isMultiple) {
      const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      const withoutOther = current.filter(
        (item) =>
          (typeof item === "object" ? item.value : item) !== "Other"
      );

      onSelect([
        ...withoutOther,
        { value: "Other", otherText: value },
      ]);
    } else {
      onSelect({ value: "Other", otherText: value });
    }
  }

  const showOtherInput =
    question.allowOther &&
    (selectedValue === "Other" ||
      (Array.isArray(selectedAnswer) &&
        selectedAnswer.some(
          (item) =>
            (typeof item === "object" ? item.value : item) === "Other"
        )));

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
        {question.category || `Section ${question.section || ""}`}
      </span>

      <h2 className="mb-4 text-2xl font-semibold text-slate-800">
        {question.question}
      </h2>

      {!question.required && (
        <p className="mb-5 text-sm text-gray-500">Optional</p>
      )}

      {isText ? (
        <textarea
          value={selectedAnswer || ""}
          onChange={(event) => onSelect(event.target.value)}
          rows={4}
          placeholder="Type your response here..."
          className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="space-y-4">
          {options.map((option) => {
            const label =
              typeof option === "string" ? option : option.label;
            const value =
              typeof option === "string" ? option : option.value;

            const isSelected = isMultiple
              ? Array.isArray(selectedAnswer) &&
                selectedAnswer.some(
                  (item) =>
                    (typeof item === "object" ? item.value : item) === value
                )
              : String(selectedValue ?? "") === String(value);

            return (
              <button
                key={String(value)}
                type="button"
                onClick={() =>
                  isMultiple ? toggleOption(value) : selectOption(value)
                }
                aria-pressed={isSelected}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white hover:bg-blue-50"
                }`}
              >
                {isMultiple && (
                  <span className="mr-3">
                    {isSelected ? "☑" : "☐"}
                  </span>
                )}
                {label}
              </button>
            );
          })}

          {showOtherInput && (
            <input
              type="text"
              value={otherText}
              onChange={(event) => updateOtherText(event.target.value)}
              placeholder="Please specify..."
              aria-label="Specify other response"
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
