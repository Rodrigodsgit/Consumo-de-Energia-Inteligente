import { SVGAttributes } from "react"
interface BallsRProps extends SVGAttributes<HTMLOrSVGElement>{}

export function BallsR(props: BallsRProps) {
  return (
    <svg
      width={197}
      height={166}
      viewBox="0 0 197 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={43.5}
        cy={43.5}
        r={43.5}
        transform="matrix(-1 0 0 1 197 0)"
        fill="#F1C400"
      />
      <circle
        cx={32.5}
        cy={32.5}
        r={32.5}
        transform="matrix(-1 0 0 1 110 79)"
        fill="#F1C400"
      />
      <circle
        cx={22}
        cy={22}
        r={22}
        transform="matrix(-1 0 0 1 180 122)"
        fill="#F1C400"
      />
      <circle
        cx={18}
        cy={18}
        r={18}
        transform="matrix(-1 0 0 1 36 43)"
        fill="#F1C400"
      />
    </svg>
  )
}


