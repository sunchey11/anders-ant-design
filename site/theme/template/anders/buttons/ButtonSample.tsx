import * as React from "react";
import { Button } from "antd";
import { MySampleProps } from "../menu/MainMenu";

interface ButtonSampleProps {
}
interface ButtonSampleState {
}
export class ButtonSample extends React.Component<ButtonSampleProps, ButtonSampleState> {
  render() {
    return (<div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="dashed">Danger</Button>
      <Button type="link">Link</Button>
    </div>)
  }
}
