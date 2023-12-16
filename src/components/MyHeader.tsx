interface Props {
  headText: string;
  leftChild: JSX.Element;
  rightChild: false | JSX.Element;
}

export default function MyHeader(props: Props) {
  return (
    <header>
      <div className="head_btn_left">{props.leftChild}</div>
      <div className="head_text">{props.headText}</div>
      <div className="head_btn_right">{props.rightChild}</div>
    </header>
  );
}
