import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vercel-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vercel-guide.html',
  styleUrls: ['./vercel-guide.css']
})
export class VercelGuideComponent {
  copiedSnippet: string | null = null;

  copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    this.copiedSnippet = id;
    setTimeout(() => {
      if (this.copiedSnippet === id) this.copiedSnippet = null;
    }, 2000);
  }
}
