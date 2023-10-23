import { CardBody, Card as CardC, CardHeader, Image } from "@nextui-org/react";

type CardProps = {
  cardImageUrl: string;
  onClick: () => void;
  name: string;
  from: string;
};

const Card = ({ cardImageUrl, onClick, name, from }: CardProps) => {
  return (
    <CardC className="py-4 w-fit bg-light">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Project in:</p>
        <small className="text-default-500">{from}</small>
        <h4 className="font-bold text-large">{name}</h4>
      </CardHeader>
      <CardBody
        className="py-2 flex items-center justify-center"
        onClick={onClick}
      >
        <Image
          isZoomed
          alt="project-icon"
          className="rounded-3xl cursor-pointer scale-110"
          src={cardImageUrl}
          width={200}
        />
      </CardBody>
    </CardC>
  );
};

export default Card;
