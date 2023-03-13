import { gql } from "@apollo/client";
import { useDatalayer } from "@jhnnsrs/datalayer";
import { useMikroQuery } from "@jhnnsrs/mikro";
import { TwoDKanvas } from "@jhnnsrs/unkover";

export const Image = ({ rep }: { rep: any }) => {
  const { s3resolve } = useDatalayer();

  return (
    <div className="rounded rounded-md overflow-hidden text-black flex flex-col">
      <TwoDKanvas path={s3resolve(rep.store)} shape={rep.shape} />
    </div>
  );
};

export const MultiWell = () => {
  const { data } = useMikroQuery(gql`
    query {
      representations(limit: 3) {
        id
        name
        shape
        store
      }
    }
  `);

  return (
    <div className="grid grid-cols-3 gap-2 mt-1 ">
      {data?.representations?.map((r: any, index: number) => (
        <Image rep={r} key={index} />
      ))}
    </div>
  );
};
