import { SVGAttributes } from "react"
interface BallsProps extends SVGAttributes<HTMLOrSVGElement>{}

export function Balls(props: BallsProps) {
  return (
    <svg
      width={197}
      height={166}
      viewBox="0 0 197 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={43.5} cy={43.5} r={43.5} fill="#F1C400" />
      <circle cx={119.5} cy={111.5} r={32.5} fill="#F1C400" />
      <circle cx={39} cy={144} r={22} fill="#F1C400" />
      <circle cx={179} cy={61} r={18} fill="#F1C400" />
    </svg>
  )
}

