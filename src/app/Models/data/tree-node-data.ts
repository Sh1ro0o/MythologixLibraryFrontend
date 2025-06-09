export interface TreeNodeData {
    name: string,
    route?: string,
    icon?: string,
    children?: TreeNodeData[],
}