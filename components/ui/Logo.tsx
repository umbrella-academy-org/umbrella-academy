import Image from "next/image";

export function Logo() {

  return (
    <div className={`relative w-80 h-40`}>
      <Image
        src={"/logo.png"}
        className="w-full h-auto object-contain"
        alt="Logo"
        fill
      />
    </div>
  );
}
