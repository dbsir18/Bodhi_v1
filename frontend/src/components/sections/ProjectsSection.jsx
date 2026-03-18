import React from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { projects } from '../../data/mock';
import { Badge } from '../ui/badge';

const ProjectsSection = () => {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-gray-400 dark:text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-1">Projects</p>
          <p className="text-sm">Coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                {project.company && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">@ {project.company}</p>
                )}
                <div className="flex gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
