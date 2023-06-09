import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/multiplayer/multiplayer-startscreen/multiplayer-startscreen-erstellen/multiplayer-startscreen-erstellen.component';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  formControl = '';
    myControl = new FormControl<string | User>('');
    options: User[] = [{ name: 'Amazon' }, { name: 'Paypal' }, { name: 'Volkswagen' }];
    filteredOptions: Observable<User[]> | undefined;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );
    }

    displayFn(user: User): string {
        return user && user.name ? user.name : '';
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
}
