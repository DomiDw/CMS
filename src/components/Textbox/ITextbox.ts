interface ITextboxBase {
    editableText: string;
}

export type ITextboxProps = ITextboxBase

export interface ITextBoxState {
    value: string;
    isInEditMode: boolean;
}
