import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../shared/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../../shared/interfaces/team';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  email = new FormControl('');
  showAddMemberForm = false;

  team: any;
  teamId: any;
  selectedTeam?: Team | null = null;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.teamId = this.route.snapshot.paramMap.get('id');

    if (this.teamId) {
      this.selectedTeam = await this.teamService.getTeam(this.teamId);

      if (this.selectedTeam) {
        this.team = this.selectedTeam;
      }
    }
  }

  toggleAddMemberForm(): void {
    this.showAddMemberForm = !this.showAddMemberForm;
  }

  addMember(teamId: string): void {
    
    console.log('teamId', teamId);
    console.log('email', this.email.value);

    this.email.reset();
    this.showAddMemberForm = false;
  }
}
