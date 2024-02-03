import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { TeamService } from '../../../shared/services/team.service';
import { Router } from '@angular/router';
import { Team } from '../../../shared/interfaces/team';
import { CommonModule } from '@angular/common';
import { NewTeamComponent } from '../team/new-team.component';
import { EditTeamComponent } from '../team/edit-team.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, NewTeamComponent, EditTeamComponent],
  templateUrl: './account.component.html',
})

export class AccountComponent implements OnInit {
  user: any;
  userId: string = '';
  myTeams: Team[] = [];
  selectedTeam: Team | null = null;
  showFullDescription?: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private teamService: TeamService
  ) { 
  }

  async ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.user = await this.authService.getUser(this.user.uid);
      if (this.user) {
        this.user = {
          id: this.user.id,
          email: this.user.email,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          teamIds: this.user.teamIds,
          createdAt: this.user.createdAt,
        };
      }
    }

    const resp = this.teamService.getTeamsByAdminId(this.user?.id || '');
    if (resp) {
      resp.subscribe((teams) => {
        this.myTeams = teams;
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  expandDescription(teamId: string, event: Event) {
    event.stopPropagation();
    const team = this.myTeams.find(t => t.id === teamId);

    if (team) {
      team.showFullDescription = true;
    }
  }

  collapseDescription(teamId: string, event: Event) {
    event.stopPropagation();
    const team = this.myTeams.find(t => t.id === teamId);

    if (team) {
      team.showFullDescription = false;
    }
  }

  newTeam() {
    this.router.navigate(['new-team', this.user.id]);
  }

  editTeam(teamId: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['edit-team', teamId]);
  }

  deleteTeam(teamId: string, event: Event) {
    event.stopPropagation();
    this.teamService.deleteTeam(teamId);
    this.ngOnInit();
  }

  shareTeam(teamId: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['share-team', teamId]);
  }

  viewTeam(teamId: string) {
    this.router.navigate(['team', teamId]);
  }
}
