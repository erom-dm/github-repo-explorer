import React from "react";
import { Method } from "axios";

export type textFieldChangeEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

export interface endpoint {
  method: Method | undefined;
  path: string;
}
