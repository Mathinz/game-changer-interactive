import React from "react";

export enum SkillLevel {
  "untranined" = 0,
  "novice" = 1,
  "apprentice" = 2,
  "adept" = 3,
  "expert" = 4,
  "master" = 5
}


interface Props {
  name: string;
  level: SkillLevel;
  images: Partial<Record<keyof typeof SkillLevel, string>>;
}

export default function Power(props: Props) {
  const { images, level, name } = props;
  const levelname = SkillLevel[level] as keyof typeof SkillLevel;
  return (
    <div className="p-4">
      <div className="grid align-middle justify-center bg-warn mr-4 clr-black" style={{ height: "80px", width: "80px" }}>
        <div>{images[levelname]}</div>
      </div>
      <div>{name}</div>
    </div>
  );
}
