import React from "react";
import { Note } from "webmidi";

const getAverage = (notes: Array<Note>) => {
  const attackSum = notes.reduce((acc, note) => acc + note.attack, 0);
  return notes.length ? attackSum / notes.length : 0;
};

const getPercentage = (ratio: number) => Math.trunc(ratio * 100);

export const AttackCompare: React.FC<{
  leftHandNotes: Array<Note>;
  rightHandNotes: Array<Note>;
}> = ({ leftHandNotes, rightHandNotes }) => {
  const leftHandAverage = getAverage(leftHandNotes);
  const rightHandAverage = getAverage(rightHandNotes);

  const total = leftHandAverage + rightHandAverage;
  const leftHandRatio = total ? leftHandAverage / total : 0;
  const rightHandRatio = total ? rightHandAverage / total : 0;

  return (
    <div className="attack-compare">
      <div>
        <span>Ratio LH: {getPercentage(leftHandRatio)}%</span>
        <span> </span>
        <span>Ratio RH: {getPercentage(rightHandRatio)}%</span>
      </div>
      <div>
        <span>Average LH: {leftHandAverage.toFixed(2)}</span>
        <span> </span>
        <span>Average RH: {rightHandAverage.toFixed(2)}</span>
      </div>
    </div>
  );
};
