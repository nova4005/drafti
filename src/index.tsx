import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom';
import {Editor, EditorState, getDefaultKeyBinding, RichUtils} from 'draft-js';
import Toolbar from "./Toolbar";
import './Drafti.css';

// @ts-ignore
export const Drafti = (props: any) => {
    const styleMap = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
    };

    function getBlockStyle(block: any) {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            default:
                return '';
        }
    }

    const editor = React.useRef(null);

    function focusEditor() {
        // @ts-ignore
        editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor();
    }, []);

    const onChange = (ES: any) => {
        props.setEditorState(ES);
    };

    const handleKeyCommand = (command: any, state: EditorState) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const mapKeyToEditorCommand = (e: any) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                props.editorState,
                4, /* maxDepth */
            );

            if (newEditorState !== props.editorState) {
                onChange(newEditorState);
            }
            return null;
        }
        return getDefaultKeyBinding(e);
    };

    return (
        <div className="RichEditor-root"
             onClick={focusEditor}>
            <Toolbar editorState={props.editorState}
                     set={props.setEditorState}
                     onChange={onChange} />
            <Editor
                ref={editor}
                editorState={props.editorState}
                onChange={state => onChange(state)}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                placeholder="Tell a story..."
                spellCheck={true}
            />
        </div>
    );
};