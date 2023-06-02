import React from "react";

interface Props {
  date: Date;
}
interface fProps extends Props {
  separator?: string;
}

/**
 * This function receives a Date and convert to the format YYYY-MM-DD.
 * Optional argument: any string to be used as dateseparator
 * @param props date: Date, separator: string
 * @returns string date YYYY-MM-DD
 */
export function FormatedDate({ date, separator }: fProps): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  let formattedDate = new Intl.DateTimeFormat("en-CA", options).format(date);
  if (separator) {
    formattedDate = formattedDate.replace(/-/g, separator);
  }
  return formattedDate;
};

// For the components
let styles: React.CSSProperties = {
  fontSize: '11px',
  textAlign: 'right',
  margin: '10px',
  marginBottom: '0'
}
export const PublishedDate: React.FC<Props> = ({ date }: Props) => {
  const pdate = FormatedDate({date});
  return <p style={styles}>Published on {pdate}</p>;
};

export const UpdateDate: React.FC<Props> = (props) => {
  const pdate = FormatedDate({ date: props.date });
  return <p style={styles}>Updated on {pdate}</p>;
};


