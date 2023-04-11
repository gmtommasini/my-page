
interface Props{
  url : string;
}
export default function IFrame(props:Props){
  const { url} = props;

  return(
    <iframe src={url} style={{ width: '100%', height: '100%', border: 'none' }} ></iframe>
  )
}