import { FC } from "react";
import { BASE_IMG_URL } from "../../consts/consts";
import "./ship.scss";

type TProps = {
  img?: string;
  name?: string;
  nation?: string;
  description?: string;
};

const Ship: FC<TProps> = ({ img, name, nation, description }) => {
  return (
    <figure className="ship">
      {img && <img src={`${BASE_IMG_URL}/${img}`} alt={`Миниатюрное изображение корабля ${name}`} loading="lazy" />}
      <figcaption>
        {name && <p>Наименование: {name}</p>}
        {nation && <p>Страна: {nation}</p>}
        {description && <p>{description}</p>}
      </figcaption>
    </figure>
  );
};

export default Ship;
