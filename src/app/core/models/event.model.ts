import type { Player } from './player.model';
import type { Team } from './team.model';

type PlayerBasicInfo = Pick<Player, 'id' | 'firstName' | 'lastName' | 'nickName' | 'number' | 'positionId'>;
type TeamBasicInfo = Pick<Team, 'id' | 'name' | 'shortname' | 'logoUrl'>;

/**
 * Match event entity
 */
export interface MatchEvent {
    typeMatchEventId: number;
    time: number;
    id: string;
    matchId: string;
    typeMatchEvent: {
        id: number;
        label: string;
        category: string;
        icon?: string | undefined;
        color?: string | undefined;
        matchPoint?: number | undefined;
        standingPoints?: number | undefined;
    };
    teamId?: string | undefined;
    playerId?: string | undefined;
}

/**
 * DTO for creating an event
 */
export interface CreateEventDto {
    type: string;
    playerId: string;
    teamId: string;
    period: number;
    minute: number;
    extraMinute?: number;
    relatedPlayerId?: string;
    description?: string;
}

/**
 * DTO for updating an event
 */
export interface UpdateEventDto {
    type?: string;
    playerId?: string;
    period?: number;
    minute?: number;
    extraMinute?: number;
    relatedPlayerId?: string;
    description?: string;
}

/**
 * Event for display in timeline
 */
export interface EventTimelineItem {
    id: string;
    type: string;
    typeLabel: string;
    typeIcon: string;
    typeColor: string;
    minute: string; // Formatted: "45'" or "90+3'"
    player: PlayerBasicInfo;
    team: TeamBasicInfo;
    relatedPlayer?: PlayerBasicInfo;
    description?: string;
    isHomeTeam: boolean;
}

/**
 * Format event minute for display
 */
export function formatEventMinute(minute: number, extraMinute?: number): string {
    if (extraMinute && extraMinute > 0) {
        return `${minute}+${extraMinute}'`;
    }
    return `${minute}'`;
}

