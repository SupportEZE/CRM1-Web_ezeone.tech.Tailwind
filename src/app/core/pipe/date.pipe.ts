import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'UTCDateFormat'
})
export class UTCDateFormatPipe implements PipeTransform {

    transform(value: string | Date): string {
        if (!value) return '';

        // Parse UTC date
        const utcDate = new Date(value);

        // Manually add 5.5 hours (19800000 milliseconds)
        const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));

        const day = istDate.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[istDate.getMonth()];
        const year = istDate.getFullYear().toString().slice(-2);

        let hours = istDate.getUTCHours();
        const minutes = istDate.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${day} ${month} ${year} ${hours}:${formattedMinutes} ${ampm}`;
    }

}
