// Stock ID rendered as a Japanese private-car number plate: white plate, green characters,
// region line on top, serial below. "KINGSTON 876" stands in for the Japanese region + class number.
export function Plate({ stock, size = "sm", animate = false }: { stock: string; size?: "sm" | "lg"; animate?: boolean }) {
  const [prefix, serial] = stock.split("-");
  const pretty = `${serial.slice(0, 2)}-${serial.slice(2)}`;
  return (
    <span className={`plate plate--${size}`} translate="no" role="img" aria-label={`Stock number ${stock}`}>
      <span className="plate__top" aria-hidden="true">
        KINGSTON <b>876</b>
      </span>
      <span className="plate__num" aria-hidden="true">
        <small>{prefix}</small>
        {animate ? (
          <span className="roll">
            {pretty.split("").map((ch, i) => (
              <span key={i} className="roll__d" style={{ "--i": i } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        ) : (
          pretty
        )}
      </span>
    </span>
  );
}

// Mileage as a mechanical odometer: one cell per digit, last cell inverted like the tenths drum.
export function Odometer({ km }: { km: number }) {
  const digits = String(km).padStart(6, "0").split("");
  return (
    <span className="odo" role="img" aria-label={`${km.toLocaleString("en-JM")} kilometres`}>
      {digits.map((d, i) => (
        <span key={i} aria-hidden="true">
          {d}
        </span>
      ))}
      <small aria-hidden="true">km</small>
    </span>
  );
}
