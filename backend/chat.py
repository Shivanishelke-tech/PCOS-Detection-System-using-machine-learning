from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass(frozen=True)
class ChatAnswer:
    answer: str
    sources: list[str]


_KB: list[tuple[re.Pattern[str], ChatAnswer]] = [
    (
        re.compile(r"\b(pc|pcos|pcod)\b", re.I),
        ChatAnswer(
            answer=(
                "PCOS (Polycystic Ovary Syndrome) is a hormonal condition that can affect periods, ovulation, "
                "and cause symptoms like acne, hair growth/hair loss, and weight changes. Only a clinician can confirm it."
            ),
            sources=["General health info"],
        ),
    ),
    (
        re.compile(r"\b(irregular|late|missed)\b.*\b(period|cycle)\b|\bcycle\b.*\b(irregular|late|missed)\b", re.I),
        ChatAnswer(
            answer=(
                "Irregular cycles can be related to PCOS, stress, thyroid issues, prolactin imbalance, or other causes. "
                "If cycles are often >35 days or you miss periods, consider medical evaluation."
            ),
            sources=["General health info"],
        ),
    ),
    (
        re.compile(r"\b(bmi|weight)\b", re.I),
        ChatAnswer(
            answer=(
                "A healthy BMI and gradual weight management can improve insulin sensitivity and symptoms for many people with PCOS. "
                "Focus on protein + fiber, strength training, and consistent sleep."
            ),
            sources=["Lifestyle guidance"],
        ),
    ),
    (
        re.compile(r"\b(diet|food|meal)\b", re.I),
        ChatAnswer(
            answer=(
                "PCOS-friendly diet often emphasizes high protein + high fiber meals, lower added sugar, and less ultra-processed foods. "
                "See the Diet Planner page for veg/non-veg options and foods to avoid."
            ),
            sources=["App diet planner"],
        ),
    ),
    (
        re.compile(r"\b(exercise|workout|walking|yoga)\b", re.I),
        ChatAnswer(
            answer=(
                "Aim for most days: brisk walking + 2–3 days/week strength work. Yoga and breathing exercises can help stress management. "
                "See the Exercise Tracker page for routines."
            ),
            sources=["App exercise tracker"],
        ),
    ),
]


def answer_question(message: str) -> ChatAnswer:
    msg = (message or "").strip()
    if not msg:
        return ChatAnswer(
            answer="Ask me anything about PCOS/PCOD, diet, exercise, sleep, or the assessment questions.",
            sources=["App help"],
        )
    for pat, ans in _KB:
        if pat.search(msg):
            return ans
    return ChatAnswer(
        answer=(
            "I can help with PCOS-related basics (symptoms, diet, exercise, sleep). "
            "For personal medical advice or diagnosis, please consult a clinician."
        ),
        sources=["App help"],
    )

