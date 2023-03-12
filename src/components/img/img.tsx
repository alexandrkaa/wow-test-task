import { FC, memo, CSSProperties } from "react";

type TProps = {
  src: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
  style?: CSSProperties;
  imgClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (evt: React.MouseEvent<HTMLElement>) => void;
  onMouseOut?: (evt: React.MouseEvent<HTMLElement>) => void;
};

const Img: FC<TProps> = ({ src, alt, className = "", width = "", style = {}, onMouseOver, onMouseOut, imgClick }) => {
  return (
    <img
      src={src}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={imgClick}
      className={className}
      alt={alt}
      style={style}
      width={width}
      loading="lazy"
    />
  );
};

export default memo(Img);
