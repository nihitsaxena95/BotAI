import { Directive, HostListener,Input } from '@angular/core';
import { AsideService } from '../../User/common/app-aside/app-aside.service';
/**
* Allows the aside to be toggled via click.
*/
@Directive({
	selector: '[appAsideMenuToggler]',
})
export class AsideToggleDirective {
	constructor(private asideService: AsideService) { }
	@Input('id') id: any = [];
	@HostListener('click', ['$event'])
	toggleOpen($event: any) {
		$event.preventDefault();
		this.asideService.idEmitter.emit(this.id);
		document.querySelector('body').classList.toggle('aside-menu-hidden');
	}
}