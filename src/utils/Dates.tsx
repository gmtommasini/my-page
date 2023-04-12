import React from "react";


const { DateTimeFormat } = Intl;

interface Props {
  date: Date;
}
interface fProps extends Props{
  separator?: string
}

export function FormatedDate(props: fProps): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "numeric" };
  let formattedDate = new DateTimeFormat("en-CA", options).format(props.date);
  if (props.separator) {
    formattedDate = formattedDate.replace(/-/g, "/");
  }

  return formattedDate;
};

export const PublishedDate: React.FC<Props> = ( props) => {
 const pdate =  FormatedDate({date:props.date});

  return <p>Published on {pdate}</p>;
};

export const UpdateDate: React.FC<Props> = ( props) => {
  const pdate =  FormatedDate({date:props.date});
 
   return <p>Updated on {pdate}</p>;
 };
 