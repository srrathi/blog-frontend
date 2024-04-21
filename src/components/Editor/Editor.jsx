import { cloneDeep } from 'lodash';
import React, { useMemo } from 'react'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import {
    blockquote,
    align,
    font,
    fontSize,
    fontColor,
    hiliteColor,
    horizontalRule,
    list,
    table,
    formatBlock,
    lineHeight,
    template,
    paragraphStyle,
    textStyle,
    link,
  } from "suneditor/src/plugins";
import AddEmojiPlugin from "./plugins/AddEmoji";

const defaultButtonList = [
    [
        "font",
        "bold",
        "strike",
        "underline",
        "italic",
        "removeFormat",
        "fontSize",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "emoji",
    ],
    ["subscript", "superscript"],
    ["align", "outdent", "indent"],
    ["undo", "redo"],
    // ["image", "video", "audio"],
    [
        "blockquote",
        "showBlocks",
        "template",
        "horizontalRule",
        "list",
        "table",
        "formatBlock",
        "lineHeight",
        "paragraphStyle",
        "link",
    ],
    ["codeView", "preview", "print", "save"],
];

const defaultFontFamily = [
    "Verdana",
    "Arial",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
];

const Editor = ({ setEditorContent, editorContent, placeholder, minHeight }) => {

    const availabelButtons = useMemo(() => {
        let buttons = cloneDeep(defaultButtonList);
        return buttons
    }, [])
    return (
        <div>
            <SunEditor
                onChange={(content) => {
                    setEditorContent(content);
                }}
                setContents={editorContent ?? null}
                setAllPlugins={true}
                autoFocus
                lang="en"
                width='100%'
                height='100%'
                setOptions={{
                    defaultStyle: "font-family: Verdana; font-size: 16px;",
                    font: defaultFontFamily,
                    charCounter: true,
                    charCounterLabel: "Character Count: ",
                    placeholder,
                    minHeight: minHeight ?? 500,
                    buttonList: availabelButtons,
                    plugins: [
                        blockquote,
                        align,
                        font,
                        fontSize,
                        fontColor,
                        hiliteColor,
                        horizontalRule,
                        list,
                        table,
                        formatBlock,
                        lineHeight,
                        template,
                        paragraphStyle,
                        textStyle,
                        link,
                        AddEmojiPlugin,
                    ],
                }}
            />
        </div>
    )
}

export default Editor