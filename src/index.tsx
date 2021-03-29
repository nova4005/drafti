import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom';
import {Editor, EditorState, getDefaultKeyBinding, RichUtils} from 'draft-js';
import Toolbar from "./Toolbar";
import './Drafti.css';

// @ts-ignore
export const Drafti = (props: any) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

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
        setEditorState(ES);
    };

    const handleKeyCommand = (command: any, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
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
                editorState,
                4, /* maxDepth */
            );

            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return null;
        }
        return getDefaultKeyBinding(e);
    };

    return (
        <div className="RichEditor-root"
             onClick={focusEditor}>
            <Toolbar editorState={editorState}
                     set={setEditorState}
                     onChange={onChange} />
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={editorState => onChange(editorState)}
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