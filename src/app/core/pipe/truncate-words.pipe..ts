import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateChars',
  standalone: true,
  pure: true
})
export class TruncateCharsPipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 10): string {
    if (!value) return '---';

    // Clean invisible characters and trim
    const cleanedValue = value.replace(/[\u200B-\u200D\uFEFF\r\n]+/g, ' ').trim();

    return cleanedValue.length > limit
      ? cleanedValue.slice(0, limit).trim() + '..'
      : cleanedValue;
  }
}
