import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/theaiaa.svg"
      alt="The AIAA Consultants Ltd logo"
      width={50}
      height={20}
      priority
    />
  )
}

export default Logo;
