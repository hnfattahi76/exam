import { useRef, useState } from "react";
import styles from "./animation.module.css";
import classNames from "classnames";

export default function AniMation() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useState<
    { id: number; text: string; show: boolean }[]
  >([
    { id: 1, text: "item 1", show: true },
    { id: 2, text: "item 2", show: true },
  ]);

  const removeItem = (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, show: false } : it))
    );
  };

  return (
    <div style={{ width: "700px", margin: "36px auto" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input type="text" ref={inputRef} />
        <button
          onClick={() => {
            const value = inputRef.current?.value?.trim();
            if (!value) return;

            setItems((prev) => [
              ...prev,
              { id: Date.now(), text: value, show: true },
            ]);

            inputRef.current!.value = "";
          }}
        >
          Add
        </button>
      </div>

      <div className={styles.items}>
        {items.map((item) => (
          <div
            key={item.id}
            className={classNames(styles.item, {
              [styles.show]: item.show,
              [styles.hide]: !item.show,
            })}
            onAnimationEnd={() => {
              if (!item.show) {
                setItems((prev) => prev.filter((it) => it.id !== item.id));
              }
            }}
          >
            <div>{item.text}</div>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}



/* .items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.item.show {
  animation: slideIn 300ms ease forwards;
}

.item.hide {
  animation: slideOut 300ms ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
} */
