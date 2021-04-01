import {RichUtils} from 'draft-js';
import React, {Fragment} from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import './Toolbar.css';

const Toolbar = (props: any) => {
    // @ts-ignore
    const onBoldClick = () => {
        RichUtils.toggleInlineStyle(props.editorState, 'BOLD');
        console.log("Test");
    };

    const toggleBlockType = (blockType: any) => {
        props.onChange(RichUtils.toggleBlockType(
            props.editorState,
            blockType
        ));
    };

    const toggleInlineStyle = (inlineStyle: any) => {
        props.onChange(RichUtils.toggleInlineStyle(
            props.editorState,
            inlineStyle
        ));
    };

    return (
        <Fragment>
            <BlockStyleControls
                editorState={props.editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={props.editorState}
                onToggle={toggleInlineStyle}
            />
        </Fragment>
    );
};

const StyleButton = (props: any) => {
    const onToggle = (e: any) => {
        e.preventDefault();
        props.onToggle(props.style);
    };
    let classNameActive = '';
    let classNameIcon = '';

    let classNameDefault = 'RichEditorStyleButton';
    if (props.active) {
        classNameActive = 'RichEditorActiveButton';
    }

    if (props.icon) {
        classNameIcon = 'material-icons';
    }

    return (
        <span className={`${classNameDefault} ${classNameActive} ${classNameIcon}`}
              onMouseDown={onToggle}>
        {props.icon ? props.icon : props.label}
        </span>
    );
};

const BLOCK_TYPES = [
    {
        label: 'H1',
        style: 'header-one'
    },
    {
        label: 'H2',
        style: 'header-two'
    },
    {
        label: 'H3',
        style: 'header-three'
    },
    {
        label: 'H4',
        style: 'header-four'
    },
    {
        label: 'H5',
        style: 'header-five'
    },
    {
        label: 'H6',
        style: 'header-six'
    },
    {
        label: 'Blockquote',
        icon: 'format_quote',
        style: 'blockquote'
    },
    {
        label: 'UL',
        icon: 'format_list_bulleted',
        style: 'unordered-list-item'
    },
    {
        label: 'OL',
        icon: 'format_list_numbered',
        style: 'ordered-list-item'
    },
    {
        label: 'Code Block',
        icon: 'code',
        style: 'code-block'
    },
];

const BlockStyleControls = (props: any) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditorControls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    icon={type.icon ?? null}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

let INLINE_STYLES = [
    {
        label: 'Bold',
        icon: 'format_bold',
        style: 'BOLD'
    },
    {
        label: 'Italic',
        icon: 'format_italic',
        style: 'ITALIC'
    },
    {
        label: 'Underline',
        icon: 'format_underlined',
        style: 'UNDERLINE'
    },
    {
        label: 'Monospace',
        icon: 'text_fields',
        style: 'CODE'
    },
];

const InlineStyleControls = (props: any) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditorControls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    icon={type.icon ?? null}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default Toolbar;