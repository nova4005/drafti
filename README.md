# drafti

> This is in a Rough state and should not be used. I am building and learning as I go with this project.

<img src="https://garrettseymour.com/images/drafty.png" width="100px" height="100px" />

[![NPM](https://img.shields.io/npm/v/drafti.svg)](https://www.npmjs.com/package/drafti) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save drafti
```

## Usage

```jsx
import React, {useState} from 'react';
import {EditorState}     from 'draft-js';
import {Drafti}          from 'drafti'

const Example = props => {
    // Set up your editorState
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    return (
        <Drafti editorState={editorState}
                setEditorState={setEditorState} />
    )
}
```

## License

MIT © [nova4005](https://github.com/nova4005)
