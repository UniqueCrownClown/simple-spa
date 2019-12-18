
import {Component} from "react";
import * as React from "react";
interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
class Test extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error("You could be a little more enthusiastic. :D");
    }

    return (
      <div>
        <div className="hello">
          <div className="greeting">
            Hello {name + this.getExclamationMarks(enthusiasmLevel)}
          </div>
          <div>
            <button onClick={onDecrement}>-</button>
            <button onClick={onIncrement}>+</button>
          </div>
        </div>
      </div>
    );
  }

  private getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join("!");
  }
}

export default Test;
