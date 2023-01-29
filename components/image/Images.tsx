import Image from "next/image";
const Images = ({
  profile,
  width,
  height,
  radius = "rounded-full",
}: {
  profile?: string;
  width: number;
  height: number;
  radius?: string;
}) => {
  return (
    <div>
      {profile ? (
        <Image
          src={profile}
          width={width}
          height={height}
          className={radius}
          alt="profile"
        />
      ) : (
        <Image
          src={"/profile.png"}
          width={width}
          height={height}
          className={radius}
          alt="profile"
        />
      )}
    </div>
  );
};

export default Images;

