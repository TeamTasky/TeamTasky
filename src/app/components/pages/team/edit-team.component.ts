import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../shared/services/team.service';
import { Team } from '../../../shared/interfaces/team';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-team.component.html'
})

export class EditTeamComponent implements OnInit {

  name = new FormControl('');
  description = new FormControl('');
  id: string | null = null;

  user: any;
  team: any;
  teamId: any;
  selectedTeam?: Team | null = null;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
      this.teamId = this.route.snapshot.paramMap.get('id');

      if (this.teamId) {
        this.selectedTeam = await this.teamService.getTeam(this.teamId);
        
        if (this.selectedTeam) {
          this.team = this.selectedTeam;
          this.name.setValue(this.team.name);
          this.description.setValue(this.team.description);
        }
      }
      
  }

  editTeam() {
    if (this.team) {
      this.team.name = this.name.value;
      this.team.description = this.description.value;

      this.teamService.updateTeam(this.team);

      this.router.navigate(['account']);
    }
  }

}
