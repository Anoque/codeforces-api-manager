import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    imports: [
      MatButtonModule,
      MatToolbarModule,
      MatProgressSpinnerModule,
      MatGridListModule,
      MatCardModule,
      MatTableModule,
      MatChipsModule,
      MatSnackBarModule,
      MatInputModule,
      MatIconModule,
      MatDialogModule,
      MatBadgeModule,
      MatTabsModule,
      MatPaginatorModule,
      MatListModule,
      MatExpansionModule
    ],
    exports: [
      MatButtonModule,
      MatToolbarModule,
      MatProgressSpinnerModule,
      MatGridListModule,
      MatCardModule,
      MatTableModule,
      MatChipsModule,
      MatSnackBarModule,
      MatInputModule,
      MatIconModule,
      MatDialogModule,
      MatBadgeModule,
      MatTabsModule,
      MatPaginatorModule,
      MatListModule,
      MatExpansionModule
    ]
})

export class MaterialModule { }
