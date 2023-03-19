import { SVGAttributes } from "react"
interface WaveProps extends SVGAttributes<HTMLOrSVGElement>{}

export function Wave(props: WaveProps) {
  return (
    <svg
      width={83}
      height={23}
      viewBox="0 0 83 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#6D62F7" d="M0 15.7073H3V22.40009H0z" />
      <path fill="#6D62F7" d="M4 13.0142H7V22.40011H4z" />
      <path fill="#6D62F7" d="M8 12.0933H11V22.4H8z" />
      <path fill="#6D62F7" d="M12 13.6328H15V22.400019999999998H12z" />
      <path fill="#6D62F7" d="M16 16.8099H19V22.39996H16z" />
      <path fill="#6D62F7" d="M20 17.6615H23V22.39995H20z" />
      <path fill="#6D62F7" d="M24 15.7618H27V22.4H24z" />
      <path fill="#6D62F7" d="M28 11.5692H31V22.399900000000002H28z" />
      <path fill="#6D62F7" d="M32 6.72534H35V22.40004H32z" />
      <path fill="#6D62F7" d="M36 8.04993H39V22.399929999999998H36z" />
      <path fill="#6D62F7" d="M40 4.30505H43V22.399949999999997H40z" />
      <path fill="#6D62F7" d="M44 0.400024H47V22.399924H44z" />
      <path fill="#6D62F7" d="M48 7.13647H51V22.39997H48z" />
      <path fill="#6D62F7" d="M52 13.4071H55V22.39996H52z" />
      <path fill="#6D62F7" d="M56 11.6421H59V22.4001H56z" />
      <path fill="#6D62F7" d="M60 9.56763H63V22.40003H60z" />
      <path fill="#6D62F7" d="M64 9.99707H67V22.399970000000003H64z" />
      <path fill="#6D62F7" d="M68 10.8123H71V22.4H68z" />
      <path fill="#6D62F7" d="M72 8.75977H75V22.40007H72z" />
      <path fill="#6D62F7" d="M76 3.87927H79V22.399970000000003H76z" />
      <path fill="#6D62F7" d="M80 4.17407H83V22.39997H80z" />
    </svg>
  )
}

