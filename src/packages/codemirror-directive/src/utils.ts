const EDITOR_MAP: { [key: string]: CodeMirror.Editor } = {};

export function getCodeMirrorEditor(id: string) {
  return EDITOR_MAP[id];
}

export function setCodeMirrorEditor(editorId: string, viewer: CodeMirror.Editor) {
  EDITOR_MAP[editorId] = viewer;
}
