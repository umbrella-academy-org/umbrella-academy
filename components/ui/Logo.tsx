import Image from "next/image";
interface LogoProps{
  size?:'lg'|'md'|'sm'
}
export function Logo({size}:LogoProps) {

  return (
    <div className={`relative ${size==='lg'?'w-80 h-40':size==='md'?'w-40 h-20':'w-20 h-10'}`}>
      <Image
        src={"/logo.png"}
        className="w-full h-auto object-contain"
        alt="Logo"
        fill
      />
    </div>
  );
}
