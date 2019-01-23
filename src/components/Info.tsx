import { Modal } from "antd";

export function info() {
  Modal.info({
    title: "This is a notification message",
    content: "some messages...some messages..."
  });
}

export function success() {
  Modal.success({
    title: "This is a success message",
    content: "some messages...some messages..."
  });
}

export function error() {
  Modal.error({
    title: "This is an error message",
    content: "some messages...some messages..."
  });
}

export function warning() {
  Modal.warning({
    title: "This is a warning message",
    content: "some messages...some messages..."
  });
}
