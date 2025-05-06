import Image from "next/image";

export function BuiltItLogo(props: {width: number, height: number}) {
    return (
        <Image
          src="/logo.png"
          alt="Build-It Inc. Logo"
          width={props.width}
          height={props.height}
        />
    );
}