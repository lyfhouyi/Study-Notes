# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build

# Utility rule file for tbb_def_files.

# Include any custom commands dependencies for this target.
include ext_build/tbb/CMakeFiles/tbb_def_files.dir/compiler_depend.make

# Include the progress variables for this target.
include ext_build/tbb/CMakeFiles/tbb_def_files.dir/progress.make

ext_build/tbb/CMakeFiles/tbb_def_files: ext_build/tbb/tbb.def
ext_build/tbb/CMakeFiles/tbb_def_files: ext_build/tbb/tbbmalloc.def

ext_build/tbb/tbb.def: ../ext/tbb/src/tbb/lin64-tbb-export.def
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Preprocessing tbb.def"
	cd /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/ext_build/tbb && /usr/bin/g++ -xc++ -E /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/ext/tbb/src/tbb/lin64-tbb-export.def -I /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/ext/tbb/include -o tbb.def

ext_build/tbb/tbbmalloc.def: ../ext/tbb/src/tbbmalloc/lin64-tbbmalloc-export.def
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Preprocessing tbbmalloc.def"
	cd /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/ext_build/tbb && /usr/bin/g++ -xc++ -E /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/ext/tbb/src/tbbmalloc/lin64-tbbmalloc-export.def -I /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/ext/tbb/include -o tbbmalloc.def

tbb_def_files: ext_build/tbb/CMakeFiles/tbb_def_files
tbb_def_files: ext_build/tbb/tbb.def
tbb_def_files: ext_build/tbb/tbbmalloc.def
tbb_def_files: ext_build/tbb/CMakeFiles/tbb_def_files.dir/build.make
.PHONY : tbb_def_files

# Rule to build all files generated by this target.
ext_build/tbb/CMakeFiles/tbb_def_files.dir/build: tbb_def_files
.PHONY : ext_build/tbb/CMakeFiles/tbb_def_files.dir/build

ext_build/tbb/CMakeFiles/tbb_def_files.dir/clean:
	cd /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/ext_build/tbb && $(CMAKE_COMMAND) -P CMakeFiles/tbb_def_files.dir/cmake_clean.cmake
.PHONY : ext_build/tbb/CMakeFiles/tbb_def_files.dir/clean

ext_build/tbb/CMakeFiles/tbb_def_files.dir/depend:
	cd /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/ext/tbb /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/ext_build/tbb /home/lyfhouyi/git/Study-Notes/assignment/Assignment2/prt/build/ext_build/tbb/CMakeFiles/tbb_def_files.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : ext_build/tbb/CMakeFiles/tbb_def_files.dir/depend

