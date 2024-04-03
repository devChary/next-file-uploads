"use client";

import "./styles.css";

export default function LoadingState() {
  return (
    <div className="loading">
      <span className="loading__dot"></span>
      <span className="loading__dot"></span>
      <span className="loading__dot"></span>
    </div>
  );
}
