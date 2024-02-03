import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../shared/services/team.service';
import { v4 as uuid } from 'uuid';
import { Team } from '../../../shared/interfaces/team';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-team',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './new-team.component.html'
})
export class NewTeamComponent implements OnInit {

    name = new FormControl('');
    description = new FormControl('');

    userId: any;
    team: any;

    constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = params['id'];
        }); 
    }

    addTeam() {
        this.team = {
            id: uuid(),
            adminId: this.userId,
            name: this.name.value,
            description: this.description.value,
            createdAt: new Date(),
            updatedAt: new Date(),
            membersIds: []
        } as Team;

        this.teamService.createTeam(this.team);
        
        this.router.navigate(['account']);
    }

}
