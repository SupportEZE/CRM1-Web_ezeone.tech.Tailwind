// highlight.service.ts
import { Injectable } from '@angular/core';

interface HighlightContext {
  rowId?: string;
  filters?: any;
  tab?: string;
  subTab?: string;
  pageIndex?: number;
}

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlights = new Map<string, HighlightContext>();
  setHighlight(pageKey: string, context: HighlightContext) {
    this.highlights.set(pageKey, context);
  }

  getHighlight(pageKey: string): HighlightContext | undefined {
    return this.highlights.get(pageKey);
  }

  clearHighlight(pageKey: string) {
    this.highlights.delete(pageKey);
  }
}
