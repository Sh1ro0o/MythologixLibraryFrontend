import { Component, Input } from '@angular/core';
import { TreeNodeData } from '../../../Models/data/tree-node-data';

@Component({
  selector: 'app-tree',
  standalone: false,
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {
  @Input({required: true}) treeData: TreeNodeData[] = [];

  expandedNodes: Set<number> = new Set<number>();

  toggleNode(index: number) {
    if(this.expandedNodes.has(index)) {
      this.expandedNodes.delete(index);
    }
    else {
      this.expandedNodes.add(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedNodes.has(index);
  }
}